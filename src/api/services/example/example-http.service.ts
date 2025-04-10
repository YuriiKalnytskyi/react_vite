import {HttpFactoryService, HttpService} from '@/module/common/services';
import {ExpectedFromQuery, IMessage, Iuuid} from '@/module/common/types';
import {IGetAll, IGetAllReq, IGetHttp, IItem, IPostHttp} from '@/types';
import axios from "axios";



class ExampleHttpService {
    constructor(private httpService: HttpService) {
    }

    async get(id?: Iuuid | null): Promise<ExpectedFromQuery<IGetHttp>> {
        const url = id ? `/http?user_id=${id}` : '/http';
        return this.httpService.get<IGetHttp>(url, {});
    }

    async all(data:IGetAllReq): Promise<IGetAll> {
        const res = await axios.get<IItem[]>(`https://jsonplaceholder.typicode.com/posts?_page=${data.page}&_limit=${data.limit}`, {});
        const count = res.headers['x-total-count'];
        const items = res.data;

        return {items, count}
    }

    async post(data: IPostHttp): Promise<ExpectedFromQuery<IMessage>> {
        return this.httpService.post<IMessage, IPostHttp>('/http', data);
    }
}

const factory = new HttpFactoryService();
export const exampleHttpService = new ExampleHttpService(factory.createHttpService());
