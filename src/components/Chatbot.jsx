import React, { useState } from "react";
const { Configuration, OpenAIApi } = require("openai")


const ChatbotApp = () => {
    const configuration = new Configuration({
      apiKey: "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",
    });
  
    const openai = new OpenAIApi(configuration);
    const [prompt, setPrompt] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const result = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 0.5,
          max_tokens: 4000,
        });
        //console.log("response", result.data.choices[0].text);
        setApiResponse(result.data.choices[0].text);
      } catch (e) {
        //console.log(e);
        setApiResponse("Something is going wrong, Please try again.");
      }
      setLoading(false);
    };
  
  
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: '50vh',
            width:"50vw",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-row">
            <textarea
              type="text"
              value={prompt}
              placeholder="Type your prompt here..."
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button
              disabled={loading || prompt.length === 0}
              type="submit"
              className='button w-1/2 bg-primary hover:bg-primary-light font-bold py-5 px-5 rounded-full'
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </form>
        </div>
        {apiResponse && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <pre>
              <strong>API response:</strong>
              {apiResponse}
            </pre>
          </div>
        )}
      </>
    );
  };