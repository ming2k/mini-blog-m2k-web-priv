type DateFormatOptions = 'full' | 'short';

interface DateFormatterConfig {
  full: Intl.DateTimeFormatOptions;
  short: Intl.DateTimeFormatOptions;
}

const DATE_FORMAT_CONFIG: DateFormatterConfig = {
  full: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  },
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
};

export function formatDate(timestamp: number | string, format: DateFormatOptions = 'full'): string {
  try {
    const normalizedTimestamp = normalizeTimestamp(Number(timestamp));
    const date = new Date(normalizedTimestamp);
    
    if (isInvalidDate(date)) {
      return 'Invalid date';
    }

    return new Intl.DateTimeFormat('en-US', DATE_FORMAT_CONFIG[format]).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}

// Private helper functions
function normalizeTimestamp(timestamp: number): number {
  return isSecondTimestamp(timestamp) ? timestamp * 1000 : timestamp;
}

function isSecondTimestamp(timestamp: number): boolean {
  return timestamp.toString().length === 10;
}

function isInvalidDate(date: Date): boolean {
  return isNaN(date.getTime());
}

// For backward compatibility (deprecated)
export const formatShortDate = (timestamp: number): string => formatDate(timestamp, 'short'); 