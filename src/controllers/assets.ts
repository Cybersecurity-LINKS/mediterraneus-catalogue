// SPDX-FileCopyrightText: 2024 Fondazione LINKS
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { Request, Response } from 'express';
import AssetService from '../services/assetsService'; 

async function getAssets(req: Request, res: Response) {
    try {         
        const assets = await AssetService.getAllAssets();
        res.status(200).send({assets: assets}).end();
    } catch (error) {
        console.log(error);
        res.status(500).send(error).end();
    }
}

const AssetController = { getAssets };
export default AssetController;