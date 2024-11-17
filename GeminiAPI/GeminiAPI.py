import google.generativeai as genai

'''Defines a function that takes in a prompt, and returns the answer to the prompt. Usually takes like 20 to 30 seconds.'''


def gemini_api_request(text):
    genai.configure(api_key="")
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        text + "Give a concise response.",
        generation_config=genai.GenerationConfig(
            max_output_tokens=200,
            temperature=1.0,
        )
    )
    return response.text
