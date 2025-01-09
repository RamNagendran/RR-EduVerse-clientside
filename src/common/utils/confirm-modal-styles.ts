const confirmModalStyles = {
    warning: {
        borderRadius: "5px",
        border: "1px solid rgb(255 198 198)",
        fontWeight: 700, padding: '8px',
        fontSize: "12px", color: "#b10404",
        backgroundColor: "#ff545426",
        letterSpacing: "0.5px"
    },
    input: {
        position: 'relative' as const,
    },
    inputBox: {
        width: '100%',
        padding: '8px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        outline: 'none',
        fontWeight: 400,
        height: '36px',
    },
    eyeIcon: {
        position: 'absolute' as const,
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
    },
    cancel: {
        border: 'none',
        background: 'white',
        color: 'rgb(52, 97, 162)'
    },
    confirm: {
        border: 'none',
        boxShadow: "0 8px 13px rgba(253,70,15,.301961)",
        background: '#df3c0a',
        color: '#fff',
    },
    addCourse: {
        background: '#0466c8',
        color: '#fff',
    },
    error: {
        color: 'red',
        fontSize: '12px',
        fontWeight: 500
    }
};

export { confirmModalStyles };