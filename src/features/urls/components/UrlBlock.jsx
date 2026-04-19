const UrlBlock = ({ isDarkMode }) => {
    const containerBg = isDarkMode ? '#1a1d24' : '#ffffff';
    const inputBg = isDarkMode ? '#212530' : '#f4f6f9'; 
    const textColor = isDarkMode ? 'text-white' : 'text-dark';
    
    // Dynamic color for the placeholder text
    const placeholderColor = isDarkMode ? '#9ca3af' : '#6c757d';
    
    const glowStyle = {
        backgroundColor: containerBg,
        border: '2px solid #3b82f6',
        boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
    };

    return (
        <div className="w-100 p-3 p-md-4 rounded-4 mb-5" style={glowStyle}>
            {/* Targets only the placeholder text */}
            <style>{`
                .url-input::placeholder {
                    color: ${placeholderColor} !important;
                    opacity: 1; /* Prevents browsers from making it transparent */
                }
            `}</style>

            <form className="d-flex flex-column flex-md-row gap-3 align-items-center m-0">
                <input 
                    type="url" 
                    // Added 'url-input' class to link the style above
                    className={`form-control flex-grow-1 border-0 shadow-none fs-5 px-3 url-input ${textColor}`} 
                    placeholder="Enter long URL to shorten..." 
                    style={{ minHeight: '50px', backgroundColor: inputBg, borderRadius: '8px' }}
                    required
                />
                <button 
                    type="submit" 
                    className="btn btn-primary fw-bold rounded-3 px-4 py-3 py-md-2 w-100 w-md-auto"
                    style={{ backgroundColor: '#3b82f6', border: 'none' }}
                >
                    Shorten
                </button>
            </form>
        </div>
    );
};

export default UrlBlock;