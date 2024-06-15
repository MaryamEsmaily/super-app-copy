const toPersianNumber = (s: string | number | undefined): string =>
  `${s}`.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number.parseInt(d, 10)]);

const toEnglishNumber = (s: string | number | undefined): string =>
  `${s}`.replace(/[۰-۹]/g, (d) => `${'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)}`);

const stringHelper = {
  toPersianNumber,
  toEnglishNumber,
};

export default stringHelper;
