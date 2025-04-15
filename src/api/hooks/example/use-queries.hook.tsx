import {UseQueryResult, useQuery} from '@tanstack/react-query';

import {exampleAuthHttpService, exampleHttpService} from '@/api/services/example';
import {Iuuid} from '@/module/common/types';
import {IGetAuthHttp, IGetHttp} from '@/types';

const getHttp = (id?: Iuuid): UseQueryResult<IGetHttp | undefined> =>
    useQuery({
        queryKey: ['example_http', id],
        queryFn: () => exampleHttpService.get(id),
        enabled: !!id
    });

const getAuthHttp = (id?: Iuuid): UseQueryResult<IGetAuthHttp | undefined> =>
    useQuery({
        queryKey: ['example_auth_http', id],
        queryFn: () => exampleAuthHttpService.get(id),
        enabled: !!id
    },);

export const useExampleQuery = {
    getHttp,
    getAuthHttp
};
