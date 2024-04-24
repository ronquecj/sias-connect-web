export const COR = (TextRun, PatchType, data) => {
  const { name, studentID, address, courseYear, semester } = data;
  const now = Date.now();
  const date = new Date(now);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);
  return {
    patches: {
      NAME: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun({
            text: name,
            size: 12,
            bold: true,
          }),
        ],
      },
      ID_NUMBER: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun({
            text: studentID,
            size: 12,
            bold: true,
          }),
        ],
      },
      ADDRESS: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun({
            text: address,
            size: 12,
            bold: true,
          }),
        ],
      },
      COURSE_YEAR: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun({
            text: courseYear,
            size: 12,
            bold: true,
          }),
        ],
      },
      SEMESTER: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun({
            text: semester,
            size: 12,
            bold: true,
          }),
        ],
      },
      DATE: {
        type: PatchType.PARAGRAPH,
        children: [
          new TextRun({
            text: formattedDate,
            size: 12,
            bold: true,
          }),
        ],
      },
    },
  };
  //   }
};
