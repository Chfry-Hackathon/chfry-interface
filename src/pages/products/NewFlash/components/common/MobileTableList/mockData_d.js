export const columns = [
  {
    title: "HOLDING",
    dataIndex: "deposits",
    key: "deposits",
    align: "left",
    scopedSlots: { customRender: "deposits" },
    mStyle:{
      width:'68px',
      textAlign:"left",
    }
  },
  {
    title: "POSITION",
    dataIndex: "balance",
    key: "balance",
    scopedSlots: { customRender: "balance" },
    mWidth:"52px",
    mStyle:{
      width:'95px',
      textAlign:"left",
    }
  },
  {
    title: "PnL",
    dataIndex: "pnl",
    key: "pnl",
    scopedSlots: { customRender: "pnl" },
    mStyle:{
      width:'40px',
      textAlign:"left",
    }
  },
  {
    title: "CLOSE",
    key: "apy",
    scopedSlots: { customRender: "apy" },
    align: "right",
    mStyle:{
      flex:1,
      textAlign:"left",
    }
  },
];
export const dataSource = [
  {
    key: "1",
    holding: "LONG",
    apy: 32,
    address: "New York No. 1 Lake Park",
    pnl: "ssss",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    holding: "LONG",
    apy: 42,
    address: "London No. 1 Lake Park",
    pnl: "ssss",

    tags: ["loser"],
  },
  {
    key: "3",
    holding: "LONG",
    apy: 32,
    address: "Sidney No. 1 Lake Park",
    pnl: "ssss",

    tags: ["cool", "teacher"],
  },
  {
    key: "4",
    holding: "LONG",
    apy: 32,
    address: "Sidney No. 1 Lake Park",
    pnl: "ssss",

    tags: ["cool", "teacher"],
  },
  {
    key: "5",
    holding: "LONG",
    apy: 32,
    address: "Sidney No. 1 Lake Park",
    pnl: "ssss",

    tags: ["cool", "teacher"],
  },
  {
    key: "6",
    holding: "LONG",
    apy: 32,
    address: "Sidney No. 1 Lake Park",
    pnl: "ssss",

    tags: ["cool", "teacher"],
  },
  {
    key: "7",
    holding: "LONG",
    apy: 32,
    address: "Sidney No. 1 Lake Park",
    pnl: "ssss",

    tags: ["cool", "teacher"],
  },

];
