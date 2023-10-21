import React from "react";
import { Button } from "./Button";
import { useRouter } from "next/router";

const SubmitButton = ({
  loading = false,
  cancelLink = undefined,
}: {
  loading: boolean;
  cancelLink?: string | undefined;
}) => {
  const router = useRouter();

  return (
    <div className="mt-5 flex w-full flex-row justify-end gap-4">
      {cancelLink && (
        <Button
          title="Cancel"
          isMedium
          isGray
          className="w-fit"
          onClick={() => {
            void router.push(cancelLink);
          }}
        >
          <span>Cancel</span>
        </Button>
      )}
      <Button
        isSubmit
        title="Save"
        isMedium
        isSuccess
        className="w-fit"
        isLoading={loading}
      >
        <span>Submit</span>
      </Button>
    </div>
  );
};

export default SubmitButton;
