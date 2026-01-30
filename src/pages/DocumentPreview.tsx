import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import type { TemplateData } from '../services/ExportService';
import { DocxController } from '../controller/DocxController';



function DocxPreviewComponent(data: TemplateData) {
    // Reference to the div container
    const previewContainerRef = useRef<HTMLDivElement>(null);

    const handlePreview = async () => {

        if (previewContainerRef.current) {
            // Clean preview if necessary

            previewContainerRef.current.innerHTML = "";
            await DocxController.preview(data, previewContainerRef.current);
        }
    };

    return (

        <div style={{ padding: '20px' }} onLoad={handlePreview}>

            <h1>Gestionnaire de Document</h1>

            {/* <div style={{ marginBottom: '20px' }}>
                <button onClick={handlePreview} style={{ marginRight: '10px' }}>
                    👁️ Prévisualiser
                </button>
            </div> */}

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

    );

};

export function DocxPreview() {
    const { id } = useParams<{ id: string }>()

    if (id) {

        const data: TemplateData | null = DocxController.mapTemplateDataFromSessID(id)
        
        if (!data) return <h1>Hummm...quelque chose cloche</h1>

        const handleDownload = () => {
            DocxController.download(id);
        };

        return (
            <>

                <div>
                    <button onClick={handleDownload}>
                        Télécharger
                    </button>
                </div>

                <div>
                    <DocxPreviewComponent sessionNbr={data.sessionNbr}
                        legend1={""} legend2={""}
                        generalInfo={data.generalInfo}
                        remindersNGoals={data.remindersNGoals}
                        activitiesList={data.activitiesList}
                    />
                </div>

            </>
        )

    } else {

        return <h1>Hummm...quelque chose est bizarre</h1>
    }

}