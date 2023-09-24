/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import Card from "~/common/components/ui/card/Card";
import { Button } from "~/common/components/ui/button";
import axios from "axios";
const UploadForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const sendToken = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post<{
        status: number;
        message: string;
        token: string;
      }>(
        "/api/services/email",
        {
          targetName: "Faruq Maulana",
          targetUserEmail: process.env.NEXT_PUBLIC_EMAIL_TARGET_TEST,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Card className="mt-[20px]">
      <Button
        isSubmit
        isSuccess
        isMedium
        isLoading={loading}
        onClick={() => sendToken()}
        className="flex w-fit items-center gap-2"
      >
        Submit
      </Button>
    </Card>
  );
};

export default UploadForm;
