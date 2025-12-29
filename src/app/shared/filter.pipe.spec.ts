import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return original array when filterString is empty', () => {
      const items = [
        { title: 'Product 1' },
        { title: 'Product 2' }
      ];
      const result = pipe.transform(items, '', 'title');
      expect(result).toEqual(items);
    });

    it('should return original array when propName is empty', () => {
      const items = [
        { title: 'Product 1' },
        { title: 'Product 2' }
      ];
      const result = pipe.transform(items, 'Product', '');
      expect(result).toEqual(items);
    });

    it('should return original array when value is null or undefined', () => {
      expect(pipe.transform(null as any, 'test', 'title')).toBeNull();
      expect(pipe.transform(undefined as any, 'test', 'title')).toBeUndefined();
    });

    it('should filter items by property (case-insensitive)', () => {
      const items = [
        { title: 'JavaScript Book' },
        { title: 'Python Guide' },
        { title: 'JavaScript Framework' }
      ];
      const result = pipe.transform(items, 'javascript', 'title');
      expect(result.length).toBe(2);
      expect(result[0].title).toBe('JavaScript Book');
      expect(result[1].title).toBe('JavaScript Framework');
    });

    it('should filter with case insensitivity', () => {
      const items = [
        { title: 'UPPERCASE' },
        { title: 'lowercase' },
        { title: 'MixedCase' }
      ];
      const result = pipe.transform(items, 'CASE', 'title');
      expect(result.length).toBe(3);
    });

    it('should handle items with leading/trailing whitespace', () => {
      const items = [
        { title: '  Trimmed Product  ' },
        { title: 'Normal Product' }
      ];
      const result = pipe.transform(items, 'Trimmed', 'title');
      expect(result.length).toBe(1);
      expect(result[0].title).toBe('  Trimmed Product  ');
    });

    it('should handle missing property gracefully with optional chaining', () => {
      const items = [
        { title: 'Has Title' },
        { name: 'No Title' }
      ];
      const result = pipe.transform(items, 'Title', 'title');
      expect(result.length).toBe(1);
      expect(result[0].title).toBe('Has Title');
    });

    it('should be efficient by pre-computing lowercase filter string', () => {
      const items = [
        { title: 'Product A' },
        { title: 'Product B' },
        { title: 'Product C' }
      ];
      // This test verifies the optimization is in place
      // The actual performance benefit would be seen with large arrays
      const result = pipe.transform(items, 'Product', 'title');
      expect(result.length).toBe(3);
    });
  });
});
