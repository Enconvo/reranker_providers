import { env } from 'process';
import { RerankerProvider, RerankerOptions, RerankResult } from './reranker_provider.ts';
import axios from 'axios';


export default function main(rerankerOptions: RerankerOptions) {

    return new EnConvoRerankerProvider({ options: rerankerOptions })

}


export class EnConvoRerankerProvider extends RerankerProvider {

    constructor(fields: { options: RerankerOptions }) {
        super(fields);
    }

    protected async _rerank(query: string, documents: string[]): Promise<RerankResult> {
        // console.log("input", input)

        const response = await axios.post('http://127.0.0.1:8181/v1/rerank',
            // const response = await axios.post('https://api.enconvo.com/v1/embeddings',
            {
                query: query,
                documents: documents,
                model: this.options.modelName?.value
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "accessToken": `${env['accessToken']}`,
                    "client_id": `${env['client_id']}`,
                    "commandKey": `${env['commandKey']}`
                }
            }
        );

        return {
            properties: {
                model: response.data.model,
                usage: response.data.usage
            },
            data: response.data.data.map((item: any) => ({
                relevance_score: item.relevance_score,
                index: item.index
            }))
        };

    }
}
