import { createClient, createChannel } from 'nice-grpc-web';
import {
  ProductsServiceDefinition,
  type ViewProductResponse,
  type ProductsServiceClient
} from '../generated/products';
import {
  type TestimonialsCountResponse,
  TestimonialsServiceDefinition,
  type TestimonialsServiceClient
} from '../generated/testimonials';
import {
  FileServiceDefinition,
  type ReadFileResponse,
  type FileServiceClient
} from '../generated/file';
import {
  OsServiceDefinition,
  type RunCommandResponse,
  type OsServiceClient
} from '../generated/os';

export class GrpcClient {
  private static instance: GrpcClient;

  public products: ProductsServiceClient;
  public testimonials: TestimonialsServiceClient;
  public file: FileServiceClient;
  public os: OsServiceClient;

  private constructor() {
    const baseUrl = import.meta.env.VITE_GRPC_URL || 'http://localhost:8081';
    const channel = createChannel(baseUrl);

    this.products = createClient(ProductsServiceDefinition, channel);
    this.testimonials = createClient(TestimonialsServiceDefinition, channel);
    this.file = createClient(FileServiceDefinition, channel);
    this.os = createClient(OsServiceDefinition, channel);
  }

  public static getInstance(): GrpcClient {
    if (!GrpcClient.instance) {
      GrpcClient.instance = new GrpcClient();
    }
    return GrpcClient.instance;
  }
}

export async function viewProductGrpc(
  productName: string
): Promise<ViewProductResponse> {
  const client = GrpcClient.getInstance();
  return client.products.viewProduct({ productName });
}

export async function getTestimonialsCountGrpc(
  query: string = 'select count(1) as count from testimonial'
): Promise<TestimonialsCountResponse> {
  const client = GrpcClient.getInstance();
  return client.testimonials.testimonialsCount({ query });
}

export async function readFileGrpc(path: string): Promise<ReadFileResponse> {
  const client = GrpcClient.getInstance();
  return client.file.readFile({ path });
}

export async function getSpawnDataGrpc(
  command: string = 'pwd'
): Promise<RunCommandResponse> {
  const client = GrpcClient.getInstance();
  return client.os.runCommand({ command });
}
