import { env } from 'process';
import { RerankerProvider, RerankerOptions, RerankResult } from './reranker_provider.ts';
import axios from 'axios';


export default function main(rerankerOptions: RerankerOptions) {

    return new VoyageRerankerProvider({ options: rerankerOptions })

}


export class VoyageRerankerProvider extends RerankerProvider {

    constructor(fields: { options: RerankerOptions }) {
        super(fields);
    }

    protected async _rerank(query: string, documents: string[]): Promise<RerankResult> {
        // console.log("input", input)

        const response = await axios.post('https://api.voyageai.com/v1/rerank',
            {
                query: query,
                documents: documents,
                model: this.options.modelName?.value
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${this.options.apiKey}`,
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
