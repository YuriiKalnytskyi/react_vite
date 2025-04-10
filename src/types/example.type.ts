import {Iuuid} from '@/module/common/types';

export interface IPostHttp {
    id: Iuuid;
}

export interface IGetHttp {
    id: Iuuid;
}

export interface IItem {
    userId: Iuuid;
    id: Iuuid,
    title: string;
    body: string;
}

export interface IGetAll {
    items: IItem[];
    count: number;
}

export interface IGetAllReq {
    page: number,
    limit: number,
    // sort: string,
    // order?: string
}

export interface IPostAuthHttp {
    id: Iuuid;
}

export interface IGetAuthHttp {
    id: Iuuid;
}
