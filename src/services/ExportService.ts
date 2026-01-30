import { renderAsync } from "docx-preview";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
} from "docx";

// --- 0. Fixed sections ---
const generalInfo: string[] = ["Thème : ", "Tuteurs : ", "Nombre tutoré.e.s : ", "Date : "]

const activityHeaders: string[] = [
  "Thème", "Format", "Nom",
  "Déroulé", "Timing", "Objectifs",
  "Matériel", "Critères d'évaluation", "Résultas obtenus"
];

const remindersNGoals: string[] = ["Rappels séance précédente : ", "Messages clés : ", "Objectifs pédagogiques : "]

// --- 1. Data interface (Fixed) ---
// xxx_l corresponds to the label of an user input
export interface TemplateData {
  sessionNbr: string;
  "legend1": string;
  "legend2": string;

  generalInfo: [
    theme: string,
    tutors: string,
    tutoredNbr: string,
    date: string
  ]

  remindersNGoals: [
    reminders: string,
    keyMsgs: string,
    goals: string
  ]

  activitiesList: [
    a_theme: string,
    a_format: string,
    a_name: string,
    a_proceedings: string,
    a_timing: string,
    a_goals: string,
    a_tools: string,
    a_criterions: string,
    a_results: string
  ][]
}

// --- 2. Document generator (Fixed logic structure) ---
export class DocumentGenerator {
  public create(data: TemplateData): Document {
    return new Document({
      sections: [
        {
          children: [
            // Document header
            new Paragraph({
              children: [
                new TextRun({ text: "Séance de tutorat n°" }),
                new TextRun({ text: data.sessionNbr }),
                new TextRun({ text: "\t\tlégende : " }),
                new TextRun({ text: data["legend1"] }),
                new TextRun({ text: " – " }),
                new TextRun({ text: data["legend2"] }),
              ],
            }),

            new Paragraph({ text: "" }),

            // General information
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: generateGeneralInfo(data.generalInfo)
                })
              ]
            }),

            new Paragraph({ text: "" }),

            // Reminders & Goals
            ...generateRemindersNGoals(data.remindersNGoals),

            new Paragraph({ text: "" }),

            // Tableau Complexe
            new Paragraph({ text: "LES ACTIVITÉS :", spacing: { after: 200 } }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: activityHeaders.map((col) =>
                    new TableCell({ children: [new Paragraph({ text: col, style: "strong" })] })
                  ),
                }),
                ...data.activitiesList.map((item) => {
                  return new TableRow({
                    children: generateActivityCells(item),
                  });
                }),
              ],
            }),
          ],
        },
      ],
    });
  }
}

function generateGeneralInfo(info: string[]): TableCell[] {
  if (generalInfo.length !== info.length) return []

  const tableCells: TableCell[] = new Array()

  for (let i = 0; i < generalInfo.length; i++) {
    tableCells.push(
      new TableCell({ children: [new Paragraph(`${generalInfo[i]} ${info[i]}`)] })
    )
  }

  return tableCells
}

function generateRemindersNGoals(info: string[]): Paragraph[] {
  if (remindersNGoals.length !== info.length) return []

  const paragraphes: Paragraph[] = new Array()

  for (let i = 0; i < remindersNGoals.length; i++) {
    paragraphes.push(new Paragraph({ text: remindersNGoals[i] }))
    paragraphes.push(new Paragraph({ text: info[i] }))

    if (i + 1 !== remindersNGoals.length) paragraphes.push(new Paragraph({ text: "" }))
  }

  return paragraphes
}

function generateActivityCells(info: string[]): TableCell[] {
  if (activityHeaders.length !== info.length) return []

  const tableCells: TableCell[] = new Array()

  for (const col of info) {
    tableCells.push(new TableCell({ children: [new Paragraph(col)] }))
  }

  return tableCells
}

// --- 3. Preview function (Into Browser) ---

/**
 * Setting up render and showing it
 */
export const previewDocx = async (data: TemplateData, containerElement: HTMLElement) => {
  const generator = new DocumentGenerator();
  const doc = generator.create(data);

  // Generation of the Blob
  const blob = await Packer.toBlob(doc);

  // Render options (optional)
  const options = {

    className: "docx-viewer", // CSS class added to the container
    inWrapper: true, // Encapsulate content to avoid CSS conflicts
    ignoreWidth: false, // Respect document width
    experimental: true // Activate certain advanced functionnalities for the rendering

  };

  // Renders the Blob into the container
  await renderAsync(blob, containerElement, containerElement, options);
}

// --- 4. Download function (From Browser) ---

/**
 * Generates the file and start immediatly downloading
 */
export const generateAndDownloadDocx = async (data: TemplateData, fileName: string = "ma-fiche-peda-plus.docx") => {
  const generator = new DocumentGenerator();
  const doc = generator.create(data);

  // Generation of the Blob
  const blob = await Packer.toBlob(doc);

  // Creation of an invisible link to force downloading
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);

  anchor.click();

  // Cleaning
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
}