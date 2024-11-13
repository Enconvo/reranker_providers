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
        const response = await axios.post('https://api.siliconflow.cn/v1/rerank',
            {
                query: query,
                documents: documents,
                model: this.options.modelName?.value
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.options.openAIApiKey}`,
                }
            }
        );

        console.log("response.data.meta", response.data.meta)
        return {
            properties: {},
            data: response.data.results.map((item: any) => ({
                relevance_score: item.relevance_score,
                index: item.index
            }))
        };
    }
}
