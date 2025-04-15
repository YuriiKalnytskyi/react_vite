import {AxiosError} from 'axios';
import {useMutation} from '@tanstack/react-query';

import {exampleAuthHttpService, exampleHttpService} from '@/api/services/example';
import {IAuthError, IPostAuthHttp, IPostHttp} from '@/types';
import {onError, onSuccess} from '@/module/common/services';
import {IMessage} from "@/module/common/types";

export const postHttp = () => {
    return useMutation<unknown, AxiosError<IAuthError>, IPostHttp>({
        mutationFn: (data: IPostHttp) => exampleHttpService.post(data),
        onSuccess: (data) => onSuccess(data as IMessage),
        onError
    });
};

export const postAuthHttp = () => {
    return useMutation<unknown, AxiosError<IAuthError>, IPostAuthHttp>({
        mutationFn: (data: IPostAuthHttp) => exampleAuthHttpService.post(data),
        onSuccess: (data) => onSuccess(data as IMessage),
        onError
    });
};

export const useExampleMutation = {
    postHttp,
    postAuthHttp
};
