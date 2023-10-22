import PropTypes from "prop-types";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import { StyledFilterForm, StyledFilterLabel } from "./StyledFilter";

const Filter = ({
  handleFilterInputChange,
  categories,
  handleFilterCategoryChange,
}) => {
  const [filterQuery, setFilterQuery] = useSearchParams();
  const { t } = useTranslation();
  const query = filterQuery.get("filter");
  const categoryQuery = filterQuery.get("category");

  const validationSchema = Yup.object().shape({
    filter: Yup.string().min(3, t("filterError")),
  });

  const formik = useFormik({
    initialValues: {
      filter: query || "",
      category: categoryQuery || "none",
    },
    validationSchema,
    validateOnChange: true,
  });

  useEffect(() => {
    if (!formik.errors.filter && !formik.isValidating) {
      setFilterQuery({
        filter: formik.values.filter,
        category: formik.values.category,
      });
      handleFilterInputChange(formik.values.filter);
      handleFilterCategoryChange(formik.values.category);
    }
  }, [
    formik.values.filter,
    formik.values.category,
    formik.errors.filter,
    formik.isValidating,
    handleFilterInputChange,
    handleFilterCategoryChange,
    setFilterQuery,
  ]);

  return (
    <StyledFilterForm onSubmit={(ev) => ev.preventDefault()}>
      <StyledFilterLabel>
        <TextField
          name="filter"
          value={formik.values.filter}
          error={formik.errors.filter !== undefined}
          helperText={formik.errors.filter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fill: "rgba(15, 10, 222, 0.75)" }} />
              </InputAdornment>
            ),
          }}
          size="small"
          variant="standard"
          placeholder={t("filterPlaceholder")}
          onChange={formik.handleChange}
          sx={{ width: "320px" }}
        />
        <FormControl>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            {t("categoryLabel")}
          </InputLabel>
          <NativeSelect
            value={formik.values.category}
            onChange={formik.handleChange}
            inputProps={{
              name: "category",
            }}
          >
            <option value="none">{t("categoryNoneOption")}</option>
            {categories.map((category) => {
              return (
                <option key={nanoid()} value={category}>
                  {category}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </StyledFilterLabel>
    </StyledFilterForm>
  );
};

Filter.propTypes = {
  handleFilterInputChange: PropTypes.func,
  handleFilterCategoryChange: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string),
};

export default Filter;
