import API_PATHS from "~/constants/apiPaths";
import ProductsTable from "~/components/pages/admin/PageProductImport/components/ProductsTable";
import CSVFileImport from "~/components/pages/admin/PageProductImport/components/CSVFileImport";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import axios from "axios";
import { useImportProducts } from "~/queries/products";

export default function PageProductImport() {
  const { data } = useImportProducts();
  console.log(data);
  const handleDownload = async () => {
    try {
      const response = await axios.get(`${API_PATHS.import}/import`, {
        params: { name: "products2.csv" },
      });
      const signedUrl = response.data;
      if (signedUrl) {
        window.open(signedUrl, "_blank");
      } else {
        console.error("Signed URL not returned");
      }
    } catch (error) {
      console.error("Error fetching signed URL:", error);
    }
  };

  return (
    <Box py={3}>
      <Box mb={2} display="flex" justifyContent="space-between">
        <CSVFileImport
          url={`${API_PATHS.import}/import`}
          title="Import Products CSV"
        />
        <Button
          size="small"
          color="secondary"
          variant="contained"
          sx={{ alignSelf: "end" }}
          onClick={handleDownload}
        >
          Import products CSV
        </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"
          sx={{ alignSelf: "end" }}
          component={Link}
          to={"/admin/product-form"}
        >
          Create product
        </Button>
      </Box>
      <ProductsTable />
    </Box>
  );
}
