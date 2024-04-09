// import { useState } from 'react';
import { patchDocument, PatchType, TextRun } from 'docx';

export const Docx = () => {
  const changeFile = async () => {
    try {
      const response = await fetch('INDIGENCY.docx');
      if (!response.ok) {
        throw new Error('Failed to load file');
      }
      const fileBuffer = await response.arrayBuffer();
      const doc = await patchDocument(fileBuffer, {
        patches: {
          NAME: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun('John Bellen')],
          },
        },
      });
      const blob = new Blob([doc], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'INDIGENCY.docx';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOnClick = () => {
    changeFile();
  };

  return <div onClick={handleOnClick}>DOCX</div>;
};
