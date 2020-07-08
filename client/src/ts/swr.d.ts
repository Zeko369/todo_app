export type IMutate<Data> = (
  data?: Data | Promise<Data> | mutateCallback<Data>,
  shouldRevalidate?: boolean
) => Promise<Data | undefined>;
