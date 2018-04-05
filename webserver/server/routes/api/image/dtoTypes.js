// @flow

import type {_STATE} from "../../../firebase/state"

export type _IMAGE_STATE_SERVER = {
    [string] : _STATE
}

export type _IMAGE_STATE_CLIENT = {
    id: string,
    origName: string,
    origImgSrc: string,
    resizedImgSrc: string,
    status: string,
    uploadTime: number,
    lastUpdate: number
}
