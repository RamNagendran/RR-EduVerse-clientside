

// ------------------------ File uploader and its style properties --------------------------------
{/* <div style={{ margin: "25px 0px" }} >
    <div className="fields-title" >Uploads</div>
    <div className="description">Upload images, screenshots or documents related to the task. <b>Maximum three are allowed</b>.</div>
    <FileUploader taskCredentials={taskCredentials} setTaskCredentials={setTaskCredentials} />
</div> */}

// .file-uploader {
//     .upload-container {
//         height: 120px; 
//         width: 100%;
//         border: 2px dashed lightgrey;
//         border-radius: 5px;
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//     }

//     .uploaded-items {
//         height: 50px;
//         width: 98%;
//         border-radius: 5px;
//         background-color: #f5f5f5;
//         // box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
//         box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         padding: 5px;

//         .file-container {
//             height: 100%;
//             width: 50px;
//             border: .5px solid lightgrey;
//         }

//         .file-name {
//             width: 75%;
//             text-overflow: ellipsis;
//             white-space: nowrap;
//             overflow: hidden;
//             font-size: 15px;
//             color: #000;
//             font-weight: 400;
//         }
//     }
// }

// --------------------------------------------------------------------------------------------------------------------




//  from 
{/* <div style={{ marginTop: "30px" }} >
                        <div className="divider-title" >Task Solutions</div>
                        <div style={{ marginTop: "20px" }} className="d-flex align-items-center justify-content-between w-100">
                            <div style={{ width: "45%" }}>
                                <div className="fields-title" >Editor type</div>
                                <EditorTypeDropdown
                                    editorType={editorType}
                                    setEditorType={setEditorType}
                                />
                            </div>
                            {editorType === "CODE" && <div style={{ width: "45%" }}>
                                <div className="fields-title" >Languages</div>
                                <LanguageType taskCredentials={taskCredentials} setTaskCredentials={setTaskCredentials} />
                            </div>}
                        </div>
                    </div>
                    <div style={{ marginTop: "25px" }}>
                        {editorType === "TEXT" && <textarea
                            value={taskCredentials?.solution || ''}
                            onChange={(e) => setTaskCredentials({ ...taskCredentials, solution: e.target.value })}
                            className="form-control"
                            placeholder="Your solution should be here..."
                            style={{ height: "180px" }}
                        />}
                        {editorType === "CODE" && <Editor className="editor" theme="vs-dark" height={"300px"}
                            language={taskCredentials?.language_type?.toLowerCase() || 'javascript'}
                            onChange={(e: any) => setTaskCredentials({
                                ...taskCredentials,
                                solution: e
                            })}
                            options={{ fontSize: 15, scrollBeyondLastLine: false }}
                            value={taskCredentials?.solution}
                            defaultValue="// your solution should be here..."
                            onValidate={handleEditorValidation}
                        />}
                    </div> */}


                    