import '@testing-library/jest-dom';
import { vi } from 'vitest';

// jsdom doesn't implement scrolling APIs
Element.prototype.scrollIntoView = vi.fn();
