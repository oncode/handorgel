
export interface IHandorgelOptions {

  /**
   * Whether multiple folds can be opened at once
   */
  multiSelectable: boolean,

  /**
   * Whether the folds are collapsible
   */
  collapsible: boolean,

  /**
   * Whether ARIA attributes are enabled
   */
  ariaEnabled: boolean,

  /**
   * Whether W3C keyboard shortcuts are enabled
   */
  keyboardInteraction: boolean,

  /**
   * Whether to loop header focus. Sets focus back
   * to first/last header when end/start reached.
   */
  carouselFocus: boolean,

  /**
   * attribute for the header or content to open folds at initialization
   */
  initialOpenAttribute: string,

  /**
   * Whether to use transition at initial open
   */
  initialOpenTransition: boolean,

  /**
   * Delay used to show initial transition
   */
  initialOpenTransitionDelay: number,

  /**
   * Header class if fold is open
   */
  headerOpenClass: string,

  /**
   * Content class if fold is open
   */
  contentOpenClass: string,

  /**
   * Header class if fold has been opened (transition finished)
   */
  headerOpenedClass: string,

  /**
   * Content class if fold has been opened (transition finished)
   */
  contentOpenedClass: string,

  /**
   * Header class if fold has been focused
   */
  headerFocusClass: string,

  /**
   * Content class if fold has been focused
   */
  contentFocusClass: string,

  /**
   * Header class if fold is disabled
   */
  headerDisabledClass: string,

  /**
   * Content class if fold is disabled
   */
  contentDisabledClass: string,

}

export interface IFolds {

  /**
   * Open content.
   */
  open(transition?: boolean):void

  /**
   * Close content.
   */
  close(transition?: boolean):void

  /**
   * Toggle content.
   */
  toggle(transition?: boolean):void

  /**
   * Disable fold.
   */
  disable(): void

  /**
   * Enable fold.
   */
  enable(): void

  /**
   * Set focus to fold button.
   */
  focus(): void

  /**
   * Remove focus from fold button.
  */
  blur(): void

  /**
   * Remove event listeners and ARIA attributes.
   */
  destroy(): void
}

export type IEvents = (

  /** Accordion is about to be destroyed */
  | 'destroy'

  /** Accordion has been destroyed. */
  | 'destroyed'

  /** Fold is about to be opened. */
  | 'fold:open'

  /** Fold has opened. */
  | 'fold:opened'

  /** Fold is about to be closed */
  | 'fold:close'

  /** Fold has closed. */
  | 'fold:closed'

  /** Fold button has been focused. */
  | 'fold:focus'

  /** Fold button has lost focus. */
  | 'fold:blur'
)

export class IHandorgel {

  constructor(selector: Element, options?: IHandorgelOptions)

  /**
   * Update fold instances - Use if you dynamically append/remove DOM nodes.
   */
  public update(): void

  /**
   * Set focus to a new header button. You can also directly
   * use the native `focus()` method on the button).
   */
  public focus(target: 'next' | 'previous' | 'last' | 'first'): void

  /**
   * Destroy fold instances, remove event listeners and ARIA attributes.
   */
  public destroy(): void

  /**
   * Event Listener
   */
  public on(events: IEvents, fn?:(fold: IFolds) => void): void

  /**
   * Event Listener
   */
  public once(events: IEvents, fn?:(fold: IFolds) => void): void

  /**
   * Event Listener (OFF)
   */
  public off(events: IEvents, fn?:(fold: IFolds) => void): void

  /**
   * Panel Folds
   */
  public folds: IFolds[]

}

export default class Handorgel extends IHandorgel {}

