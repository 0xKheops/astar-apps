import { inject, injectable } from 'inversify';
import { IMetadataRepository } from 'src/v2/repositories';
import { ChainMetadata } from 'src/v2/models';
import { IApi } from 'src/v2/integration';
import { Symbols } from 'src/v2/symbols';

@injectable()
export class MetadataRepository implements IMetadataRepository {
  private metadata!: ChainMetadata;

  constructor(@inject(Symbols.Api) private api: IApi) {}

  public async getChainMetadata(): Promise<ChainMetadata> {
    if (!this.metadata) {
      const api = await this.api.getApi();
      const decimals = api.registry.chainDecimals[0];
      const token = api.registry.chainTokens[0];
      const chain = await api.rpc.system.chain();

      this.metadata = new ChainMetadata(decimals, token, chain.toString());
    }

    return this.metadata;
  }
}
