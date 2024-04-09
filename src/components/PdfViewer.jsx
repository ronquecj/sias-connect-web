import PdfViewerComponent from './PdfViewerComponent';
import { useLocation } from 'react-router-dom';

export const PdfViewer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const blobURL = searchParams.get('blobURL');

  return (
    <div className="PDF-viewer">
      <PdfViewerComponent document={blobURL} />
    </div>
  );
};
