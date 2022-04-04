interface BuildUrlOpts {
  query: BuildUrlQuery;
}

type BuildUrlQuery = Record<string, string | number>;

export default function buildUrl(url: string, opts: BuildUrlOpts): string {
  const res = new URL(url);

  Object.entries(opts.query).forEach(([key, value]) => {
    res.searchParams.set(key, String(value));
  });

  return res.toString();
}
