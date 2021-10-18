import { TimeConversionPipe } from './time-conversion.pipe';

describe('TimeConversionPipe', () => {
  const pipe = new TimeConversionPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should correctly convert into hours', () => {
    expect(pipe.transform(60)).toBe('1 hour');
    expect(pipe.transform(148)).toBe('2 hours 28 minutes');
    expect(pipe.transform(208)).toBe('3 hours 28 minutes');
  });

  it('should not convert amounts less than an hour', () => {
    expect(pipe.transform(1)).toBe('1 minute');
    expect(pipe.transform(59)).toBe('59 minutes');
  });
});
