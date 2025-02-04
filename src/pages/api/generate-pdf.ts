import type { NextApiRequest, NextApiResponse } from 'next'
import latex from 'node-latex'
import getTemplateData from '../../lib/templates'
import { FormValues } from '../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://resumake.art3m1s.me');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).end();
    return
  }

  try {
    const pdf = await generatePDF(req.body as FormValues);

    pdf.pipe(res)
      .on('error', (err) => {
        res.status(500).end();
      });

    res.setHeader('Content-Type', 'application/pdf');
  } catch (err) {
    res.status(500).end();
  }
}

function escapeLatexSpecialCharsAndMarkdown(str: string): string {
  // Escape LaTeX special characters (excluding asterisks)
  let escapedStr = str
    .replace(/\\/g, '\\textbackslash ')
    .replace(/#/g, '\\#')
    .replace(/\$/g, '\\$')
    .replace(/%/g, '\\%')
    .replace(/&/g, '\\&')
    .replace(/_/g, '\\_')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/~/g, '\\textasciitilde')
    .replace(/\^/g, '\\textasciicircum');

  // Replace Markdown bold and italics
  // The non-greedy regex (.*?) ensures it matches the shortest possible string
  escapedStr = escapedStr
    .replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}')
    .replace(/\*(.*?)\*/g, '\\textit{$1}');

  return escapedStr;
}

function cleanData(data: FormValues): FormValues {
  data.projects?.forEach((project) => {
    project.highlights = project.highlights?.map(highlight =>
      escapeLatexSpecialCharsAndMarkdown(highlight)
    );
  });

  data.work?.forEach((work) => {
    work.highlights = work.highlights?.map(highlight =>
      escapeLatexSpecialCharsAndMarkdown(highlight)
    );
  });

  return data;
}

/**
 * Generates a LaTeX document from the request body,
 * and then generates a PDF from that document.
 *
 * @param formData The request body received from the client.
 *
 * @return The generated PDF.
 */
async function generatePDF(formData: FormValues) {
  const cleanedData = cleanData(formData)
  const { texDoc, opts } = getTemplateData(cleanedData)
  try {
    const pdf = latex(texDoc, opts)
    return pdf
  } catch (err) {
    console.log(`Error generating PDF for template ${formData.selectedTemplate}`)
    // Return Blank pdf
    return latex('', opts)
  }
}
