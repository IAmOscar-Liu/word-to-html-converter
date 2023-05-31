const { parse } = require("node-html-parser");
const getAbstract = require("./getAbstract");
const getClaims = require("./getClaims");
const getDescriptionDrawings = require("./getDescriptionDrawing");
const getDrawings = require("./getDrawings");
const getFigureDrawing = require("./getFigureDrawings");
const getModeForInvention = require("./getModeForInvention");
const getTechFieldAndBackgroundArtAndDisclosure = require("./getTechFieldAndBackgroundArtAndDisclosure");
const getTitle = require("./getTitle");

function parseHTML(html) {
  const root = parse(html);

  // 找中英文新型名稱
  const { patentType, title, titleEn, titleElement } = getTitle(root);

  // 找中英文摘要
  const { abstract, abstractEn } = getAbstract(titleElement);

  const general = { generalIdx: 1 };

  // 找技術領域、先前技術、新型/發明內容
  const { techFields, backgroundArtFields, disclosureFields } =
    getTechFieldAndBackgroundArtAndDisclosure(root, general);

  // 找圖式簡單說明
  const { drawingElementFields } = getDrawings(root, general);

  // 找實施方式
  const { modeForInventionFields } = getModeForInvention(root, general);

  // 找申請專利範圍
  const { claimFields } = getClaims(root);

  // 找代表圖之符號簡單說明
  const { figureDrawingIdx, figureDrawingFields } = getFigureDrawing(root);

  // 找符號說明
  const { descriptionOfElementFields } = getDescriptionDrawings(root);

  return {
    title,
    titleEn,
    abstract,
    abstractEn,
    techFields,
    backgroundArtFields,
    disclosureFields,
    drawingElementFields,
    modeForInventionFields,
    claimFields,
    figureDrawingIdx,
    figureDrawingFields,
    descriptionOfElementFields,
  };
}

module.exports = { parseHTML };
