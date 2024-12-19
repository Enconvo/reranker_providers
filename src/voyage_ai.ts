import { RerankerProvider } from '@enconvo/api';
import axios from 'axios';


export default function main(options: RerankerProvider.RerankerOptions) {

    return new VoyageRerankerProvider({ options })

}


export class VoyageRerankerProvider extends RerankerProvider {

    constructor(fields: { options: RerankerProvider.RerankerOptions }) {
        super(fields);
    }

    protected async _rerank(query: string, documents: string[]): Promise<RerankerProvider.RerankResult> {
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
