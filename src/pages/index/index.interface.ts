/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-20 19:27:23
 */
/**
 * index.state 参数类型
 * @interface IndexState
 */
export interface IndexState {
    RenderData?:any,
    charts?:any,
    bottom?:any,
    code?:any,
    groupPrice ?:any,
    purchasePrice ?:any,
    sellingPrice ?:any,
    isCheckPass?:boolean,
    RenderData2?:RenderData2Type,
}

/**
 * index.props 参数类型
 *
 * @export
 * @interface IndexProps
 */
export interface IndexProps {
    dispatch?: any,
    data?: Array<DataInterface>
}

export interface DataInterface {
    des:string,
    lunar:string,
    thumbnail_pic_s:string,
    title:string,
    _id:string,
    name:string,
    comment:string,
    content:Array<Item>
}

export interface Item {
    album_id:string,
    album_title:string,
    all_rate:string,
    author: string,
    biaoshi: string,
    pic_big: string,
    pic_small:string,
    rank_change: string,
    song_id:string,
    title: string,
}

export interface RenderData2Type{
    solod?:number;
    
}