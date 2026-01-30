import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { TemplateData } from '../services/ExportService';
import { DocxController } from '../controller/DocxController';


export function DocxPreview() {
    const { id } = useParams<{ id: string }>()

    if (id) {
        const data: TemplateData | null = DocxController.mapTemplateDataFromSessID(id)
        
        if (!data) return <h1>Hummm...quelque chose cloche</h1>

        const navigate = useNavigate()
        // Reference to the div container
        const previewContainerRef = useRef<HTMLDivElement>(null);

        const handlePreview = async () => {

            if (previewContainerRef.current) {
                // Clean preview if necessary
                previewContainerRef.current.innerHTML = "";

                await DocxController.preview(data, previewContainerRef.current);
            }
        };

        const handleDownload = () => {
            DocxController.download(id);
        };

        const handleLeaving = () => {
            navigate(`/fiche-pedagogique/${id}`)
        };

        return (
            <>

                <div style={{ padding: '20px' }} /*onLoad={handlePreview}*/>

                    <h1>Aperçu</h1>

                    <div className='form-actions'>
                        <button onClick={handlePreview} className='btn btn-accent'>
                            Charger aperçu
                        </button>

                        <button onClick={handleDownload} className='btn btn-accent'>
                            Télécharger
                        </button>

                        <button onClick={handleLeaving} className='btn btn-secondary'>
                            Retour
                        </button>
                    </div>

                    <div
                        style={{

                            border: '1px solid #ccc',
                            height: '600px',
                            overflow: 'auto',
                            background: '#f0f0f0',
                            padding: '20px'

                        }}
                    >
                        <div ref={previewContainerRef} />
                    </div>

                </div>

            </>
        )

    } else {

        return <h1>Hummm...quelque chose est bizarre</h1>
    }

}