import { BlobOptions } from "buffer";
import { Message } from "@/model/User";

export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean
}