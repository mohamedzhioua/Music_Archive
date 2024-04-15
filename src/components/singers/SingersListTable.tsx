import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import AlertModal from "../ui/AlertModal";
import { Fragment, useEffect, useState } from "react";
import { Scrollbar } from "../ui/Scrollbar";
import toast from "react-hot-toast";
import { simpleFilter } from "@/lib/utils/filters";
import { pagination } from "@/lib/utils/paginations";
import TableSearchBar from "../ui/TableSearchBar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const SingersListTable = (props: any) => {
  const { singers: initialSingers } = props;
  const [singers, setSingers] = useState([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [singerId, setSingerId] = useState<string>("");

  useEffect(() => {
    setSingers(initialSingers);
  }, [initialSingers]);

  const handleQueryChange = (event: any) => {
    setQuery(event.target.value);
  };
  const onPageChange = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const onRowsPerPageChange = (event: any) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const handleUpdate = () => {};

  const handleDelete = (id: string) => {
    setSingerId(id);
    setOpen(true);
  };
  const onDelete = async () => {
    setLoading(true)
    const savingPromise: Promise<void> = new Promise(
      async (resolve, reject) => {
        const response = await fetch(`/api/singers?id=${singerId}`, {
          method: 'DELETE',
        });
         if (response.ok){
          setSingers(singers.filter((item: any) => item._id !== singerId));
          setLoading(false);
          setOpen(false);
          setSingerId("");
          resolve();
        }  
        else {
          const errorData = await response.json();
           reject(errorData.message || "something went wrong.");
        }
      }
    );
      await toast.promise(savingPromise, {
        loading: 'Deleting...',
        success: 'Deleted',
        error: 'Error',
      });
 
    }


  const filteredSingers = simpleFilter(singers, query);
  const paginatedData = pagination(filteredSingers, page, limit);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Card>
        <TableSearchBar handleQueryChange={handleQueryChange} query={query} />
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Countrie</TableCell>
                <TableCell>songs</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            {paginatedData?.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography color="text.primary"> No result </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {paginatedData?.map((item: any) => {
                  return (
                    <Fragment key={item._id}>
                      <TableRow key={item._id} hover>
                        <TableCell>
                          <Typography color="text.primary">
                            {item.stockReference}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="text.primary">
                            {item.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="text.primary">
                            {item.country}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="text.primary">
                            {item.songs
                              .slice(0, 4)
                              .map((song: any) => song.songName)
                              .join(", ")}
                            {item.songs.length > 4 && " ..."}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleUpdate()}>
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(item._id)}>
                            <DeleteOutlineOutlinedIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={filteredSingers?.length}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

export default SingersListTable;
