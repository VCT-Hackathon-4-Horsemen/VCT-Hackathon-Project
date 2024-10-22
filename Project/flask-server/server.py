from flask import Flask, jsonify, request
import boto3
import json

app = Flask(__name__)


s3_client = boto3.client('s3')
bedrock_client = boto3.client('bedrock', region_name='us-east-1')

def get_data_from_s3(bucket_name, object_key):
    """Fetch data from an S3 bucket."""
    try:
        s3_response = s3_client.get_object(Bucket=bucket_name, Key=object_key)
        data = s3_response['Body'].read().decode('utf-8') 
        return data
    except Exception as e:
        print(f"Error fetching data from S3: {str(e)}")
        return None

def invoke_llm(input_text):
    """Invoke the Bedrock LLM with the provided input text."""
    try:
        response = bedrock_client.invoke_model(
            modelId='foundation-model-id',  
            body=json.dumps({
                "inputText": input_text
            }),
            accept='application/json',
            contentType='application/json'
        )
        
        
        model_output = json.loads(response['body'])
        return model_output.get('generated_text')  

    except Exception as e:
        print(f"Error invoking LLM: {str(e)}")
        return None

@app.route("/chat", methods=["POST"])
def chat():
    """Handle chat messages from the frontend."""
    data = request.get_json()
    user_message = data.get("message")

    if user_message:
        llm_response = invoke_llm(user_message)

        if llm_response:
            return jsonify({"LLM_Output": llm_response}), 200
        else:
            return jsonify({"error": "Failed to process LLM data"}), 500
    else:
        return jsonify({"error": "No message provided"}), 400

@app.route("/process-s3-llm", methods=["GET"])
def process_s3_llm():
    """Process S3 data with LLM."""
    input_text = request.args.get('input')
    if not input_text:
        return jsonify({"error": "No input provided"}), 400

    
    bucket_name = 'your-bucket-name'  
    object_key = 'path/to/your/object.txt'  

    
    s3_data = get_data_from_s3(bucket_name, object_key)

    if s3_data:
        llm_response = invoke_llm(s3_data)
        
        if llm_response:
            return jsonify({"LLM_Output": llm_response}), 200
        else:
            return jsonify({"error": "Failed to process LLM data"}), 500
    else:
        return jsonify({"error": "Failed to fetch data from S3"}), 500

@app.route("/members", methods=["GET"])
def members():
    """Return a list of members."""
    return jsonify({"members": ["member 1", "member 2", "member 3"]})

if __name__ == "__main__":
    app.run(debug=True)
