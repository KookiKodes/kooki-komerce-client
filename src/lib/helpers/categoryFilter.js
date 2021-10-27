import { DateTime } from 'luxon';

const searched = keyword => by => order => categories =>
  categories
    .filter(c =>
      by === 'Name' ? c.name.match(new RegExp(keyword, 'i')) : true
    )
    .sort(function (a, b) {
      switch (by) {
        case 'Created':
          if (order === 'asc') {
            return DateTime.fromISO(a.createdAt) < DateTime.fromISO(b.createdAt)
              ? -1
              : 1;
          }
          return DateTime.fromISO(b.createdAt) < DateTime.fromISO(a.createdAt)
            ? -1
            : 1;
        case 'Updated':
          if (order === 'asc') {
            return DateTime.fromISO(a.updatedAt) < DateTime.fromISO(b.updatedAt)
              ? -1
              : 1;
          }
          return DateTime.fromISO(b.updatedAt) < DateTime.fromISO(a.updatedAt)
            ? -1
            : 1;
        default:
          if (order === 'asc') {
            return a.name < b.name ? -1 : 1;
          }
          return b.name < a.name ? -1 : 1;
      }
    });

export default searched;
