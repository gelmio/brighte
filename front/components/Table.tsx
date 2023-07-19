import { View } from "./Themed";
import { ReactNode, useState } from "react";
import { DataTable } from "react-native-paper";

export default function Table<T extends Record<string, any>>({
  items,
  itemsPerPageOptions = [10, 20, 30],
  columns,
}: {
  items: T[];
  itemsPerPageOptions?: number[];
  columns: {
    key: keyof T | string;
    headerDisplay?: string;
    cellRender?: (row: T) => ReactNode;
  }[];
}) {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, onItemsPerPageChange] = useState(itemsPerPageOptions[0]);

  const from = (page - 1) * itemsPerPage;
  const to = Math.min(page * itemsPerPage, items.length);

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          {columns.map((column) => (
            <DataTable.Title key={column.key as string}>
              {column.headerDisplay || (column.key as string)}
            </DataTable.Title>
          ))}
        </DataTable.Header>
        {items.slice(from, to).map((item, itemIndex) => (
          <DataTable.Row key={item.key}>
            {columns.map((column) => (
              <DataTable.Cell key={`${column.key as string}-${itemIndex}`}>
                {column.cellRender
                  ? column.cellRender(item)
                  : column.key
                  ? item[column.key]
                  : ""}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={itemsPerPageOptions}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
    </View>
  );
}
