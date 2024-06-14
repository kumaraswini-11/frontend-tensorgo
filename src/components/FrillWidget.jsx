import { useEffect } from "react";

// Frill Widget (https://frill.co)
const FrillWidget = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.src = "https://widget.frill.co/v2/widget.js";
    script.async = true;

    // Add Frill config to window
    window.Frill_Config = window.Frill_Config || [];
    window.Frill_Config.push({ key: "c6a5925d-6d18-45a7-a6d7-43c440da1322" });

    // Append script to body
    document.body.appendChild(script);

    return () => {
      // Clean up the script
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default FrillWidget;
