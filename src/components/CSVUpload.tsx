import { useCallback } from 'react';
import Papa from 'papaparse';
import { Upload } from 'lucide-react';

interface CSVUploadProps<T> {
  label: string;
  description: string;
  onDataLoaded: (data: T[]) => void;
  isLoaded: boolean;
}

/**
 * CSVUpload Component
 * Handles file upload and parsing using PapaParse.
 * Generic type T allows reuse for different CSV structures.
 */
export function CSVUpload<T>({ 
  label, 
  description, 
  onDataLoaded, 
  isLoaded 
}: CSVUploadProps<T>) {
  
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse<T>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true, // Auto-converts numbers
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          onDataLoaded(results.data);
        }
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        alert(`Error parsing ${label}: ${error.message}`);
      }
    });

    // Reset input so same file can be re-uploaded
    event.target.value = '';
  }, [label, onDataLoaded]);

  return (
    <div className={`csv-upload-card ${isLoaded ? 'loaded' : ''}`}>
      <div className="upload-icon">
        <Upload size={24} />
      </div>
      <h3>{label}</h3>
      <p className="description">{description}</p>
      
      <label className="upload-button">
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange}
          hidden 
        />
        {isLoaded ? '✓ Uploaded' : 'Choose CSV File'}
      </label>
    </div>
  );
}
