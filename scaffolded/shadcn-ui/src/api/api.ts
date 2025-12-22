import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { toast } from 'sonner';
import {
    AudioService,
    Body_attach_file_to_meeting_meeting__meeting_id__documents_file_post,
    ChatRequest,
    ChatService,
    DetachDocumentFromMeetingMeetingMeetingIdDocumentsDocumentIdDeleteData,
    DocumentService,
    Meeting,
    MeetingCreate,
    MeetingService,
    OcrService,
    OpenAPI,
    TagCreate,
    TagService,
    TranscribeAudioAudioTranscribeAudioPostData,
    TranscribeAudioMeetingMeetingIdAudioPurposePostData,
    UploadImageOcrTrascribePostData,
    User,
    UserCreate,
    UserService,
    type StreamingChatRequest,
} from './client';
import { getErrorMessage } from '@/lib/error';

export const useChat = () => {
    const chatMutation = useMutation({
        mutationFn: (data: ChatRequest) => {
            return ChatService.chatChatPost({ requestBody: data });
        },
    });

    return {
        chatMutation,
        isLoading: chatMutation.isPending,
        isError: chatMutation.isError,
        isSuccess: chatMutation.isSuccess,
        error: chatMutation.error,
        data: chatMutation.data,
    };
};

// Streaming chat types for client-side parsing
type StreamingChatChunk = {
    event: string;
    task_id: string;
    message_id: string;
    id?: string;
    conversation_id: string;
    mode?: string;
    answer?: string;
    metadata?: Record<string, unknown>;
    created_at: number;
    workflow_run_id?: string;
    data?: Record<string, unknown>;
    from_variable_selector?: unknown[];
};

type StreamChatArgs = Readonly<{
    requestBody: StreamingChatRequest;
    onChunk: (chunk: StreamingChatChunk) => void;
}>;

export const useStreamChat = () => {
    const controllerRef = useRef<AbortController | null>(null);

    const streamChatMutation = useMutation({
        mutationFn: async ({ requestBody, onChunk }: StreamChatArgs) => {
            // Cancel any in-flight stream before starting a new one
            if (controllerRef.current) {
                controllerRef.current.abort();
                controllerRef.current = null;
            }

            const controller = new AbortController();
            controllerRef.current = controller;

            const res = await fetch(`${OpenAPI.BASE}/chat/stream`, {
                method: 'POST',
                headers: {
                    Accept: 'text/event-stream',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...requestBody,
                    response_mode: 'streaming',
                }),
                signal: controller.signal,
            });

            if (!res.ok || !res.body) {
                throw new Error(`Streaming request failed with status ${res.status}`);
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    buffer += decoder.decode(value, { stream: true });

                    // Split SSE events by double newline
                    const events = buffer.split(/\n\n/);
                    // Keep the last partial chunk in buffer
                    buffer = events.pop() || '';

                    for (const ev of events) {
                        const line = ev.split('\n').find((l) => l.startsWith('data: '));
                        if (!line) continue;
                        const json = line.slice(6);
                        try {
                            const chunk = JSON.parse(json) as StreamingChatChunk;
                            onChunk(chunk);
                        } catch {
                            // Ignore malformed chunks
                            continue;
                        }
                    }
                }
            } finally {
                reader.releaseLock();
                if (controllerRef.current === controller) {
                    controllerRef.current = null;
                }
            }
        },
    });

    return {
        streamChatMutation,
        stop: () => {
            if (controllerRef.current) {
                controllerRef.current.abort();
                controllerRef.current = null;
            }
        },
        isLoading: streamChatMutation.isPending,
        isError: streamChatMutation.isError,
        isSuccess: streamChatMutation.isSuccess,
        error: streamChatMutation.error,
        data: streamChatMutation.data,
    };
};

export const useTranscribeAudio = () => {
    const transcribeAudioMutation = useMutation({
        mutationFn: (data: TranscribeAudioAudioTranscribeAudioPostData) => {
            return AudioService.transcribeAudioAudioTranscribeAudioPost(data);
        },
    });

    return {
        transcribeAudioMutation,
        isLoading: transcribeAudioMutation.isPending,
        isError: transcribeAudioMutation.isError,
        isSuccess: transcribeAudioMutation.isSuccess,
        error: transcribeAudioMutation.error,
        data: transcribeAudioMutation.data,
    };
};

export const useOcr = () => {
    const ocrMutation = useMutation({
        mutationFn: (data: UploadImageOcrTrascribePostData) => {
            return OcrService.uploadImageOcrTrascribePost(data);
        },
    });

    return {
        ocrMutation,
        isLoading: ocrMutation.isPending,
        isError: ocrMutation.isError,
        isSuccess: ocrMutation.isSuccess,
        error: ocrMutation.error,
        data: ocrMutation.data,
    };
};

export const useConversations = (limit?: number, last_id?: string) => {
    const conversationsQuery = useQuery({
        queryKey: ['conversations', limit, last_id],
        queryFn: () => {
            return ChatService.conversationsChatConversationsGet({
                limit,
                lastId: last_id,
            });
        },
    });

    return {
        conversationsQuery,
        isLoading: conversationsQuery.isPending,
        isError: conversationsQuery.isError,
        isSuccess: conversationsQuery.isSuccess,
        error: conversationsQuery.error,
        data: conversationsQuery.data,
    };
};

export const useMessages = (
    conversation_id?: string,
    limit?: number,
    last_id?: string,
    enabled?: boolean
) => {
    const messagesQuery = useQuery({
        queryKey: ['messages', conversation_id, limit, last_id],
        queryFn: () => {
            if (!conversation_id) {
                return [];
            }
            return ChatService.messagesChatMessagesGet({
                conversationId: conversation_id,
                limit,
                lastId: last_id,
            });
        },
        enabled: enabled,
    });

    return {
        messagesQuery,
        isLoading: messagesQuery.isPending,
        isError: messagesQuery.isError,
        isSuccess: messagesQuery.isSuccess,
        error: messagesQuery.error,
        data: messagesQuery.data,
    };
};

export const useUser = () => {
    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            return {
                firstname: 'John',
                lastname: 'Doe',
                idx: '123',
                created_at: '2021-01-01',
                updated_at: '2021-01-01',
                initials: 'JD',
            } as User;
            // return UserService.getUserUserMeGet();
        },
        retry: false,
    });

    return {
        userQuery,
        isLoading: userQuery.isPending,
        isError: userQuery.isError,
        isSuccess: userQuery.isSuccess,
        error: userQuery.error,
        data: userQuery.data,
    };
};

export const useRegisterUser = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    const registerUserMutation = useMutation({
        mutationFn: (data: UserCreate) => {
            return UserService.registerUserUserRegisterPost({ requestBody: data });
        },
        onSuccess: () => {
            // Invalidate user query cache to refetch user data after registration
            queryClient.invalidateQueries({ queryKey: ['user'] });
            onSuccess?.();
        },
    });

    return {
        registerUserMutation,
        isLoading: registerUserMutation.isPending,
        isError: registerUserMutation.isError,
        isSuccess: registerUserMutation.isSuccess,
        error: registerUserMutation.error,
        data: registerUserMutation.data,
    };
};

export const useMeetings = (search?: string, limit?: number, offset?: number) => {
    const meetingsQuery = useQuery({
        queryKey: ['meetings', search || undefined, limit, offset],
        queryFn: () => {
            return MeetingService.getMeetingsMeetingGet({
                search: search || undefined,
                limit,
                offset,
            });
        },
    });

    return {
        meetingsQuery,
        isLoading: meetingsQuery.isPending,
        isError: meetingsQuery.isError,
        isSuccess: meetingsQuery.isSuccess,
        error: meetingsQuery.error,
        data: meetingsQuery.data,
    };
};

export const useMeeting = (meetingId: string) => {
    const meetingQuery = useQuery({
        queryKey: ['meeting', meetingId],
        queryFn: () => {
            return MeetingService.getMeetingMeetingMeetingIdGet({ meetingId });
        },
    });

    return {
        meetingQuery,
        isLoading: meetingQuery.isPending,
        isError: meetingQuery.isError,
        isSuccess: meetingQuery.isSuccess,
        error: meetingQuery.error,
        data: meetingQuery.data,
    };
};

export const useCreateMeeting = () => {
    const createMeetingMutation = useMutation({
        mutationFn: (data: MeetingCreate) => {
            return MeetingService.createMeetingMeetingPost({ requestBody: data });
        },
    });

    return {
        createMeetingMutation,
        isLoading: createMeetingMutation.isPending,
        isError: createMeetingMutation.isError,
        isSuccess: createMeetingMutation.isSuccess,
        error: createMeetingMutation.error,
        data: createMeetingMutation.data,
    };
};

export const useTags = (search?: string, limit?: number, offset?: number) => {
    const tagsQuery = useQuery({
        queryKey: ['tags', search, limit, offset],
        queryFn: () => {
            return TagService.getTagsTagGet({ search, limit, offset });
        },
    });

    return {
        tagsQuery,
        isLoading: tagsQuery.isPending,
        isError: tagsQuery.isError,
        isSuccess: tagsQuery.isSuccess,
        error: tagsQuery.error,
        data: tagsQuery.data,
    };
};

export const useCreateTag = () => {
    const queryClient = useQueryClient();

    const createTagMutation = useMutation({
        mutationFn: (data: TagCreate) => {
            return TagService.createTagTagPost({ requestBody: data });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] });
        },
    });

    return {
        createTagMutation,
        isLoading: createTagMutation.isPending,
        isError: createTagMutation.isError,
        isSuccess: createTagMutation.isSuccess,
        error: createTagMutation.error,
        data: createTagMutation.data,
    };
};

export const useAddTagsToMeeting = () => {
    const queryClient = useQueryClient();

    const addTagsToMeetingMutation = useMutation({
        mutationFn: ({
            meetingId,
            tag_ids,
        }: {
            meetingId: string;
            tag_ids: string[];
        }): Promise<Meeting> => {
            return MeetingService.addTagsToMeetingMeetingMeetingIdTagsPost({
                meetingId,
                requestBody: { tag_ids },
            });
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['meetings'] });
            queryClient.invalidateQueries({ queryKey: ['meeting', variables.meetingId] });
        },
    });

    return {
        addTagsToMeetingMutation,
        isLoading: addTagsToMeetingMutation.isPending,
        isError: addTagsToMeetingMutation.isError,
        isSuccess: addTagsToMeetingMutation.isSuccess,
        error: addTagsToMeetingMutation.error,
        data: addTagsToMeetingMutation.data,
    };
};

export const useRemoveTagFromMeeting = () => {
    const queryClient = useQueryClient();

    const removeTagFromMeetingMutation = useMutation({
        mutationFn: ({
            meetingId,
            tagId,
        }: {
            meetingId: string;
            tagId: string;
        }): Promise<Meeting> => {
            return MeetingService.removeTagFromMeetingMeetingMeetingIdTagsTagIdDelete({
                meetingId,
                tagId,
            });
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['meetings'] });
            queryClient.invalidateQueries({ queryKey: ['meeting', variables.meetingId] });
        },
    });

    return {
        removeTagFromMeetingMutation,
        isLoading: removeTagFromMeetingMutation.isPending,
        isError: removeTagFromMeetingMutation.isError,
        isSuccess: removeTagFromMeetingMutation.isSuccess,
        error: removeTagFromMeetingMutation.error,
        data: removeTagFromMeetingMutation.data,
    };
};

export const useDocuments = (search?: string, limit?: number, offset?: number) => {
    const documentsQuery = useQuery({
        queryKey: ['documents', search, limit, offset],
        queryFn: () => {
            return DocumentService.getDocumentsDocumentGet({ search: search, limit, offset });
        },
    });

    return {
        documentsQuery,
        isLoading: documentsQuery.isPending,
        isError: documentsQuery.isError,
        isSuccess: documentsQuery.isSuccess,
        error: documentsQuery.error,
        data: documentsQuery.data,
    };
};

export const useDocument = (documentId: string) => {
    const documentQuery = useQuery({
        queryKey: ['document', documentId],
        queryFn: () => {
            return DocumentService.getDocumentDocumentDocumentIdGet({ documentId });
        },
        enabled: !!documentId,
    });

    return {
        documentQuery,
        isLoading: documentQuery.isPending,
        isError: documentQuery.isError,
        isSuccess: documentQuery.isSuccess,
        error: documentQuery.error,
        data: documentQuery.data,
    };
};

export const useDocumentFile = (documentId: string) => {
    const documentFileQuery = useQuery({
        queryKey: ['documentFile', documentId],
        queryFn: async () => {
            // Fetch the file directly using fetch to ensure proper blob handling
            const response = await fetch(`${OpenAPI.BASE}/document/${documentId}/file`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/octet-stream',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Convert response to blob
            const blob = await response.blob();
            return blob;
        },
        enabled: !!documentId,
    });

    return {
        documentFileQuery,
        isLoading: documentFileQuery.isPending,
        isError: documentFileQuery.isError,
        isSuccess: documentFileQuery.isSuccess,
        error: documentFileQuery.error,
        data: documentFileQuery.data,
    };
};

export const useAttachDocumentToMeeting = () => {
    const queryClient = useQueryClient();

    const attachDocumentToMeetingMutation = useMutation({
        mutationFn: ({
            meetingId,
            documentId,
        }: {
            meetingId: string;
            documentId: string;
        }): Promise<Meeting> => {
            return MeetingService.attachDocumentToMeetingMeetingMeetingIdDocumentsPost({
                meetingId,
                requestBody: { document_id: documentId },
            });
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['meetings'] });
            queryClient.invalidateQueries({ queryKey: ['meeting', variables.meetingId] });
        },
    });

    return {
        attachDocumentToMeetingMutation,
        isLoading: attachDocumentToMeetingMutation.isPending,
        isError: attachDocumentToMeetingMutation.isError,
        isSuccess: attachDocumentToMeetingMutation.isSuccess,
        error: attachDocumentToMeetingMutation.error,
        data: attachDocumentToMeetingMutation.data,
    };
};

export const useDetachDocumentFromMeeting = () => {
    const queryClient = useQueryClient();
    const detachDocumentFromMeetingMutation = useMutation({
        mutationFn: (
            data: DetachDocumentFromMeetingMeetingMeetingIdDocumentsDocumentIdDeleteData
        ): Promise<Meeting> => {
            return MeetingService.detachDocumentFromMeetingMeetingMeetingIdDocumentsDocumentIdDelete(
                data
            );
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['meetings'] });
            queryClient.invalidateQueries({ queryKey: ['meeting', variables.meetingId] });
        },
    });
    return {
        detachDocumentFromMeetingMutation,
        isLoading: detachDocumentFromMeetingMutation.isPending,
        isError: detachDocumentFromMeetingMutation.isError,
        isSuccess: detachDocumentFromMeetingMutation.isSuccess,
        error: detachDocumentFromMeetingMutation.error,
        data: detachDocumentFromMeetingMutation.data,
    };
};

export const useAttachFileToMeeting = () => {
    const queryClient = useQueryClient();

    const attachFileToMeetingMutation = useMutation({
        mutationFn: ({
            meetingId,
            formData,
        }: {
            meetingId: string;
            formData: Body_attach_file_to_meeting_meeting__meeting_id__documents_file_post;
        }): Promise<Meeting> => {
            return MeetingService.attachFileToMeetingMeetingMeetingIdDocumentsFilePost({
                meetingId,
                formData,
            });
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['meetings'] });
            queryClient.invalidateQueries({ queryKey: ['meeting', variables.meetingId] });
        },
    });

    return {
        attachFileToMeetingMutation,
        isLoading: attachFileToMeetingMutation.isPending,
        isError: attachFileToMeetingMutation.isError,
        isSuccess: attachFileToMeetingMutation.isSuccess,
        error: attachFileToMeetingMutation.error,
        data: attachFileToMeetingMutation.data,
    };
};

export const useTranscribeAudioForMeeting = () => {
    const transcribeAudioForMeetingMutation = useMutation({
        mutationFn: (data: TranscribeAudioMeetingMeetingIdAudioPurposePostData) => {
            return MeetingService.transcribeAudioMeetingMeetingIdAudioPurposePost(data);
        },
    });

    return {
        transcribeAudioForMeetingMutation,
        isLoading: transcribeAudioForMeetingMutation.isPending,
        isError: transcribeAudioForMeetingMutation.isError,
        isSuccess: transcribeAudioForMeetingMutation.isSuccess,
        error: transcribeAudioForMeetingMutation.error,
        data: transcribeAudioForMeetingMutation.data,
    };
};

/**
 * Hook to create API mutations with automatic toast notifications
 * @param mutationFn - The mutation function that performs the API call
 * @param options - Configuration options for the mutation
 * @returns A hook that returns the mutation with toast notifications
 */
export function useMakeApi<TData = unknown, TVariables = unknown>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options?: {
        successMessage?: string | ((data: TData) => string);
        errorMessage?: string | ((error: unknown) => string);
        onSuccess?: (data: TData, variables: TVariables) => void;
        onError?: (error: unknown, variables: TVariables) => void;
        invalidateQueries?: string[][];
    }
) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn,
        onSuccess: (data, variables) => {
            const successMsg =
                typeof options?.successMessage === 'function'
                    ? options.successMessage(data)
                    : options?.successMessage || 'Operation completed successfully';
            toast.success(successMsg);

            // Invalidate queries if specified
            if (options?.invalidateQueries) {
                for (const queryKey of options.invalidateQueries) {
                    queryClient.invalidateQueries({ queryKey });
                }
            }

            // Call custom onSuccess if provided
            options?.onSuccess?.(data, variables);
        },
        onError: (error, variables) => {
            const errorMsg =
                typeof options?.errorMessage === 'function'
                    ? options.errorMessage(error)
                    : options?.errorMessage || getErrorMessage(error);
            toast.error(errorMsg);

            // Call custom onError if provided
            options?.onError?.(error, variables);
        },
    });

    return {
        mutation,
        mutate: mutation.mutate,
        mutateAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
        data: mutation.data,
    };
}
