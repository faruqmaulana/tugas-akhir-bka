/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  pengajuanPrestasiForm,
  type IPengajuanPrestasiForm,
} from "~/common/schemas/module/pengajuan/pengajuan-prestasi.shema";
import { zodResolver } from "@hookform/resolvers/zod";

const UploadForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPengajuanPrestasiForm>({
    resolver: zodResolver(pengajuanPrestasiForm),
  });

  const [avatarPreview, setAvatarPreview] = useState("");

  const onSubmit = async () => {
    console.log("datasss", data);
    try {
      const formData = new FormData();
      formData.append("file", data.avatar[0]);

      const { data: responseData } = await axios.post("/api/upload", formData);

      setAvatarPreview(responseData.url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setValue("piagamPenghargaan", e.target.files[0]);
      // setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <form
        onSubmit={void handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div>
          {avatarPreview && <img src={avatarPreview} alt="Preview" />}
          <label htmlFor="avatar">
            <input
              type="file"
              accept="image/*"
              id="avatar"
              {...register("piagamPenghargaan")}
              onChange={handleFileChange}
            />
          </label>
          {errors.piagamPenghargaan?.message && (
            <p>{errors.piagamPenghargaan?.message}</p>
          )}
        </div>
      </form>
      <button onClick={() => onSubmit()}>Upload</button>
    </div>
  );
};

export default UploadForm;
