import type { NextApiRequest, NextApiResponse } from "next";
import log from "logger";
import {
  AIRTABLE_PROD_VIEW_ID,
  AIRTABLE_STG_VIEW_ID,
  env,
  fetcher,
} from "shared/utils";
import { Records, Response } from "shared/types/airtable";

const parse = ({ records }: { records: Records[] }) => {
  return records.map((record: Records) => {
    return {
      id: record.id,
      createdAt: record.createdTime,
      ...record.fields,
    };
  });
};

async function fetchTable(endpoint: string): Promise<Response> {
  const token = process.env.AIRTABLE_API_KEY;
  const opts = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetcher(endpoint, opts);

  return parse(data);
}

function getEndpoint(tableName: string) {
  const tableId =
    env !== "production" ? AIRTABLE_STG_VIEW_ID : AIRTABLE_PROD_VIEW_ID;

  return `https://api.airtable.com/v0/${tableId}/${tableName}?maxRecords=100&view=Grid%20view`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | string>
) {
  try {
    const endpoint = getEndpoint("photos");
    const data = await fetchTable(endpoint);

    res.status(200).json(data);
  } catch (e) {
    log.error(e, `Request to airtable API failed`);
    res.status(400).send(`Request to airtable API failed ${e}`);
  }
}
