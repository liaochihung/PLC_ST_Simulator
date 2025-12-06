import { ANTLRErrorListener, RecognitionException, Recognizer } from 'antlr4ts';

export class SimpleErrorListener implements ANTLRErrorListener<any> {
    public static readonly INSTANCE = new SimpleErrorListener();

    syntaxError<T>(
        recognizer: Recognizer<T, any>,
        offendingSymbol: T | undefined,
        line: number,
        charPositionInLine: number,
        msg: string,
        e: RecognitionException | undefined
    ): void {
        console.error(`line ${line}:${charPositionInLine} ${msg}`);
    }
}
