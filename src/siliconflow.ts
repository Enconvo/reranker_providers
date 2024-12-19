import { RerankerProvider } from '@enconvo/api';
import axios from 'axios';


export default function main(options: RerankerProvider.RerankerOptions) {

    return new SiliconFlowRerankerProvider({ options })

}


export class SiliconFlowRerankerProvider extends RerankerProvider {

    constructor(fields: { options: RerankerProvider.RerankerOptions }) {
        super(fields);
    }

    protected async _rerank(query: string, documents: string[]): Promise<RerankerProvider.RerankResult> {
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
