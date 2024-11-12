export interface RerankerOptions {
    modelName?: {
        title: string;
        value: string;
        context: number;
    };
    [key: string]: any;
}

export interface RerankItem {
    relevance_score: number;
    index: number;
}

export interface RerankResult {
    properties: Record<string, any>;
    data: RerankItem[];
}

export abstract class RerankerProvider {
    protected options: RerankerOptions;

    constructor(fields: { options: RerankerOptions }) {
        this.options = fields.options;
    }

    protected abstract _rerank(query: string, documents: string[]): Promise<RerankResult>;

    async rerank(query: string, documents: string[]): Promise<RerankResult> {
        // If query or documents are empty, return zero scores
        if (!query?.trim() || !documents?.length || documents.every(doc => !doc?.trim())) {
            return {
                properties: {},
                data: documents?.map((_, index) => ({
                    relevance_score: 0,
                    index
                })) || []
            };
        }

        let retries = 3;
        while (retries > 0) {
            try {
                const results = await this._rerank(query, documents);
                return results;
            } catch (error) {
                console.error(`Error on attempt ${4 - retries}/3:`, error);
                retries--;
                if (retries === 0) {
                    throw error;
                }
                // Wait 1 second before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        // This should never be reached due to the return in the if (retries === 0) block
        throw new Error("Unexpected end of retry loop");
    }
}
